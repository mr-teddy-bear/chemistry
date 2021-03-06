import React, { useEffect } from "react";
import Menu from "../common/Menu";
import styles from "./styles.module.css";
import { ReactComponent as Lock } from "../../assets/img/lock.svg";
import { ReactComponent as Check } from "../../assets/img/check.svg";
import { getClassInfo, changeMessage } from "../../store/subjects/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../common/SnackBar";

function HomeWorkChemistry() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassInfo());
  }, [dispatch]);
  const isRequesting = useSelector((state) => state.subjects.isRequesting);
  const homeworks = useSelector((state) => state.subjects.chemistry);
  const dialogMessage = useSelector((state) => state.subjects.message);

  return (
    <div className={styles.main}>
      {isRequesting && (
        <div className={styles.preload}>
          <CircularProgress />
        </div>
      )}
      <Menu />
      <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.textTitle}>
            Химия
            <br />
            Домашнее задание
          </h1>
        </div>
        <div className={styles.bloks}>
          {homeworks.map((homework) => {
            return (
              <Link
                key={homework.id}
                to={
                  homework.status === "active"
                    ? "/chemistryQuestion?test=" + homework.id + "&&id=1"
                    : "/chemistry"
                }
                className={[
                  styles.blok,
                  homework.status === "disabled"
                    ? styles.disabled
                    : homework.status === "waiting"
                    ? styles.waiting
                    : homework.status === "success"
                    ? styles.success
                    : "",
                ].join(" ")}
              >
                <h1 className={styles.blokTitle}>{homework.title}</h1>
                <h5 className={styles.miniTitle}>{homework.subtitle}</h5>
                {homework.status === "disabled" ||
                homework.status === "waiting" ? (
                  <Lock className={styles.lock} />
                ) : homework.status === "success" ? (
                  <Check className={styles.successIcon} />
                ) : (
                  ""
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <SnackBar
        dialogMessage={dialogMessage}
        closeHandler={() => dispatch(changeMessage(""))}
      />
    </div>
  );
}

export default HomeWorkChemistry;
