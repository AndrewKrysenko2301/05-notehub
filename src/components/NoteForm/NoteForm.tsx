import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateNoteDto } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.mixed<CreateNoteDto["tag"]>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as CreateNoteDto["tag"],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
            setSubmitting(false);
          },
          onSettled: () => {
            setSubmitting(false);
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <FormikErrorMessage
              name="title"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />
            <FormikErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <FormikErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>

          {mutation.isError && (
            <div className={css.error}>Something went wrong, try again.</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
