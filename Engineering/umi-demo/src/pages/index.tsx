import styles from './index.less';
import { history, Link } from 'umi';

export default function IndexPage() {
  const goPage = () => {
    history.push('/user')
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/user">User Page</Link>
      <button onClick={goPage}>go user page</button>
    </div>
  );
}
