import type { NextPage } from "next";
import axios from "axios";
import styles from "./index.module.css";
import Link from "next/link";

type Billionare = {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
};

type Props = {
  billionaries: Billionare[];
};

const Home: NextPage<Props> = ({ billionaries }) => {
  return (
    <div className={styles.layout}>
      {billionaries.map((v, i) => (
        <Link key={i} href={`/person/${v.id}`}>
          <div className={styles.billionare}>
            <div className={styles.picture}>
              <img
                src={v.squareImage}
                width="200"
                height="200"
                alt="no pictures"
              />
            </div>
            <div className={styles.title}>
              <span className={styles.name}>{v.name}</span>
              <span className={styles.info}>
                {v.netWorth} / {v.industries[0]}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const resp = await axios.get<Billionare[]>(
      "https://billions-api.nomadcoders.workers.dev/"
    );
    if (resp.status !== 200) {
      console.log(`fail to get billionaries. status:${resp.status}`);
      return {
        props: {},
      };
    }
    return {
      props: {
        billionaries: resp.data,
      },
    };
  } catch (err) {
    console.log(`fail to request billionaries. err:${err}`);
    return {
      props: {},
    };
  }
}

export default Home;
