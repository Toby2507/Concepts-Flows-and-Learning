import { cleanEnv, str, port } from "envalid";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        PORT: port({ default: 3000 }),
        DATABASE_URI: str()
    });
}

export default validateEnv;