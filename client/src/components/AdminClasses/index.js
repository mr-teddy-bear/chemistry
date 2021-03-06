import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "../common/AdminMenu";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import validationSchema from "./validationLoginSchema";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles.module.css";
import {
  getClassInfo,
  addRazdel,
  deleteRazdel,
  changeMessage,
} from "../../store/admin/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../common/SnackBar";

function AdminClasses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassInfo());
  }, [dispatch]);
  const isRequesting = useSelector((state) => state.admin.isRequesting);
  const dialogMessage = useSelector((state) => state.admin.message);

  const razdels = useSelector((state) => state.admin.razdels);
  return (
    <div className={styles.main}>
      {isRequesting && (
        <div className={styles.preload}>
          <CircularProgress />
        </div>
      )}
      <AdminMenu text="Разделы" />
      <div className={styles.mainContainer}>
        <div className={styles.infoBlock}>
          <h2>Разделы</h2>
          <table className={styles.razdelTable}>
            <thead>
              <tr>
                <td>№</td>
                <td>Название</td>
                <td>Удалить</td>
              </tr>
            </thead>
            <tbody>
              {razdels.map((razdel) => {
                return (
                  <tr key={razdel.id}>
                    <td>{razdel.number}</td>
                    <td>
                      {razdel.title} {razdel.subtitle}
                    </td>
                    <td>
                      <Button
                        onClick={() => dispatch(deleteRazdel(razdel.id))}
                        color="secondary"
                      >
                        <CloseIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.addBlock}>
          <h2>Добавить раздел</h2>
          <Formik
            initialValues={{ title: "", subtitle: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(addRazdel(values));
              resetForm({ values: "" });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                method="post"
                className={styles.addForm}
                onSubmit={handleSubmit}
              >
                <input
                  className={[
                    styles.formInput,
                    errors.title && touched.title ? styles.inputError : "",
                  ].join(" ")}
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="title"
                />
                <input
                  className={[
                    styles.formInput,
                    errors.subtitle && touched.subtitle
                      ? styles.inputError
                      : "",
                  ].join(" ")}
                  type="text"
                  name="subtitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subtitle}
                  placeholder="subtitle"
                />

                <Button
                  type="submit"
                  className={styles.btn}
                  variant="outlined"
                  color="primary"
                >
                  Добавить
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <SnackBar
        dialogMessage={dialogMessage}
        closeHandler={() => dispatch(changeMessage(""))}
      />
    </div>
  );
}

export default AdminClasses;
