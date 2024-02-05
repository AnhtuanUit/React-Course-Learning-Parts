import Map from '@src/components/Map';
import Sidebar from '@src/components/Sidebar';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
