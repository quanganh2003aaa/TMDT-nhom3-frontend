import React from "react";
import styles from "./404.module.css"; // Sử dụng CSS Modules
import { Helmet } from "react-helmet";

const Loi = () => {
    return (
        <div>
            <Helmet>
                <title>Lỗi 404 Not Found</title>
            </Helmet>
            <div className={styles.agileitsMain}>
                <div className={styles.agileinfoRow}>
                    <div className={styles.w3layoutsErrortext}>
                        <h2>
                            4<span>0</span>4
                        </h2>
                        <h1>Xin lỗi! Có vẻ bạn không có quyền truy cập vào trang web này</h1>
                        <p className={styles.w3lstext}>
                            Nếu bạn có thắc mắc gì hãy liên hệ tới{" "}
                            <a href="/home">SneakerStudio</a> và chúng tôi sẽ liên hệ với bạn để giải quyết.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loi;
