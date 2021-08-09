import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Synfusion-test</h5>
            <p className={styles.description}>
            Syncfusion Essential JS 2 for React is a modern React UI Components library that has been built from the ground up to be lightweight, responsive, modular and touch friendly.
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
            <li>
                <a className={styles.footerlink} href="https://ej2.syncfusion.com/react/documentation/">
                  Help
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://ej2.syncfusion.com/react/demos">
                Online Samples
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="https://www.syncfusion.com/support/directtrac/incidents">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;