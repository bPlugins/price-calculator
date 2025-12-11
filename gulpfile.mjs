import 'dotenv/config';
import gulp from 'gulp';
import { deleteAsync } from 'del';
import fsDeploy from 'gulp-freemius-deploy';

gulp.task('clean', async () => await deleteAsync(['*.zip', 'build/*', 'languages/*']));

fsDeploy(gulp, {
    developer_id: parseInt(process.env.DEVELOPER_ID),
    plugin_id: parseInt(process.env.PRODUCT_ID),
    public_key: process.env.PUBLIC_KEY,
    secret_key: process.env.SECRET_KEY,
    zip_name: 'price-calculator.zip',
    zip_path: '',
    add_contributor: false
});