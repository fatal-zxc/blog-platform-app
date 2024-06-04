import { useForm, useFieldArray } from 'react-hook-form'

import styles from './article-form.module.scss'

export default function ArticleForm({ submit, article }) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article && article.title,
      description: article && article.description,
      text: article && article.body,
      tags: article && article.tags,
    },
  })
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'tags',
  })

  const tags = watch('tags')

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submit)}
    >
      <label
        className={styles.label}
        htmlFor="title"
      >
        Title
        <input
          className={`${styles.text} ${errors.title ? styles.invalid : ''}`}
          id="title"
          placeholder="Title"
          {...register('title', { required: true, maxLength: 60 })}
        />
        {errors.title && errors.title.type === 'required' && <p className={styles.alert}>title is required</p>}
        {errors.title && errors.title.type === 'maxLength' && (
          <p className={styles.alert}>title must be no more than 60 characters</p>
        )}
      </label>
      <label
        className={styles.label}
        htmlFor="description"
      >
        Short description
        <input
          className={`${styles.text} ${errors.description ? styles.invalid : ''}`}
          id="description"
          placeholder="Short description"
          {...register('description', { required: true, maxLength: 200 })}
        />
        {errors.description && errors.description.type === 'required' && (
          <p className={styles.alert}>description is required</p>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <p className={styles.alert}>description must be no more than 200 characters</p>
        )}
      </label>
      <label
        className={styles.label}
        htmlFor="text"
      >
        Text
        <textarea
          className={`${styles.textarea} ${errors.text ? styles.invalid : ''}`}
          id="text"
          placeholder="Text"
          {...register('text', { required: true })}
        />
        {errors.text && errors.text.type === 'required' && <p className={styles.alert}>text is required</p>}
      </label>
      <p className={`${styles.label} ${styles.labelTags}`}>Tags</p>
      <section className={styles.tagMenu}>
        <div className={styles.tagList}>
          {fields.map((tag, index) => (
            <div
              className={styles.tagWrapper}
              key={tag.id}
            >
              <div className={styles.tag}>
                <input
                  className={styles.text}
                  placeholder="Tag"
                  {...register(`tags.${index}.value`, {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/,
                    validate: (value) =>
                      ![...tags.slice(0, index), ...tags.slice(index + 1, tags.length - 1)]
                        .map((el) => el.value)
                        .includes(value),
                  })}
                />
                <button
                  className={styles.delete}
                  aria-label="delete"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
              {errors.tags && errors.tags[index] && errors.tags[index].value.type === 'required' && (
                <p className={styles.alert}>tag is required, if you dont need this tag - just delete</p>
              )}
              {errors.tags && errors.tags[index] && errors.tags[index].value.type === 'pattern' && (
                <p className={styles.alert}>
                  you can use only english letters and digits without spaces and other symbols
                </p>
              )}
              {errors.tags && errors.tags[index] && errors.tags[index].value.type === 'validate' && (
                <p className={styles.alert}>tags must be unique</p>
              )}
            </div>
          ))}
        </div>
        <button
          className={styles.addTag}
          aria-label="add tag"
          type="button"
          onClick={() => append({ value: '' })}
        >
          Add tag
        </button>
      </section>
      <input
        className={styles.submit}
        type="submit"
        value="Send"
      />
    </form>
  )
}
