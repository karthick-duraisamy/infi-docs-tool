import { useHistory } from "@docusaurus/router";
import { useEffect, useState } from "react";
import styles from './index.module.css';
import SvgRenderer from "../components/SvgRenderer";
import infinitiLogo from "../../static/img/infiniti.svg";
import cShape from "../../static/img/Groupcshape.svg";
import infiniti20 from "../../static/img/20-years-infiniti-logo.svg";
import { useRole } from "../context/RoleContext";
import config from "@site/src/config.json";
import { simpleDecode } from "../utils/simpleAuth"; // ⬅️ Import the decoder

const dummyUsers = config.dummyUsers;

export default function Login(){
    const history = useHistory();
    const { setRole } = useRole();
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>(''); // 🔴 new state for error
    const userData = dummyUsers;

    useEffect(() => {
        localStorage.setItem("auth", "false");
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const autoUser = params.get("username");
        const autoPass = params.get("password");
    
        if (autoUser && autoPass) {
            setUser(autoUser);
            setPassword(autoPass);
    
            // Auto-login
            const matchedUser = userData.find(
                (u) => u.username === autoUser && u.password === autoPass
            );
    
            if (matchedUser) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("role", matchedUser.role);
                localStorage.setItem("user", JSON.stringify(matchedUser));
                setRole(matchedUser.role);
                history.push("/");
            } else {
                setError("Invalid username or password");
            }
        }
    }, []);   
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("auth");
    
        if (encoded) {
            const creds = simpleDecode(encoded);
            if (creds) {
                const [autoUser, autoPass] = creds;
                setUser(autoUser);
                setPassword(autoPass);
    
                const matchedUser = userData.find(
                    (u) => u.username === autoUser && u.password === autoPass
                );
    
                if (matchedUser) {
                    localStorage.setItem("auth", "true");
                    localStorage.setItem("role", matchedUser.role);
                    localStorage.setItem("user", JSON.stringify(matchedUser));
                    setRole(matchedUser.role);
                    history.push("/");
                } else {
                    setError("Invalid username or password");
                }
            } else {
                setError("Invalid or corrupted auth token");
            }
        }
    }, []);    

    const handleSubmit = () => {
        const matchedUser = userData.find(
            (u) => u.username === user && u.password === password
        );
        if (matchedUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", matchedUser.role);
            localStorage.setItem("user", JSON.stringify(matchedUser));
            setRole(matchedUser.role);
            history.push("/");
        } else {
            setError("Invalid username or password"); // 🔴 set error message
        }
    };

    return (
        <div className={styles.loginPage}>
            <p className="logo">docs<span>tool</span></p>
            <SvgRenderer component={infiniti20} className="logo-right" />
            <div className="cls-logo-dtl">
                <div className="cls-login-desc">
                    <h2>Welcome to the Centralized Documentation Tool</h2>
                    <p>This platform brings all your documentation together in one place.</p>
                    <ul>
                        <li>🧭 Easy navigation with nested folders</li>
                        <li>🔐 Role-based access control for secure docs</li>
                        <li>🛠️ Markdown & MDX support with live preview</li>
                        <li>📄 Integrated editor to create & edit docs directly</li>
                        <li>🔍 Full-text search across all pages</li>
                    </ul>
                </div>
                <div className={styles.loginContainer}>
                    <h3>
                        <SvgRenderer component={infinitiLogo} />
                        <span className={styles.loginTitle}>Login</span>
                    </h3>

                    <label htmlFor="user">User name</label>
                    <input
                        type="text"
                        id="user"
                        placeholder="Username"
                        value={user}
                        onChange={(e) => {
                            setUser(e.target.value);
                            setError('');
                        }}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />
                    {/* <button className={styles.forgetButton}>Forget password?</button> */}
                    {/* 🔴 show error message if any */}
                    <div className="cls-error-container">
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                    <button className={styles.loginButton} type="submit" onClick={handleSubmit}>
                        Sign in
                    </button>
                </div>
            </div>
            <SvgRenderer component={cShape} className={styles.cshape} />
            <SvgRenderer component={cShape} className={styles.cshape1} />
            <SvgRenderer component={cShape} className={styles.cshape2} />
            <SvgRenderer component={cShape} className={styles.cshape3} />
            <SvgRenderer component={cShape} className={styles.cshape4} />
            <SvgRenderer component={cShape} className={styles.cshape5} />
            <SvgRenderer component={cShape} className={styles.cshape6} />
            <SvgRenderer component={cShape} className={styles.cshape7} />
        </div>
    );
}
