import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./person.module.css";

type FinancialAssets = {
  exchange: string;
  ticker: string;
  companyName: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
};

type Person = {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  thumbnail: string;
  squreImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
  financialAssets: FinancialAssets[];
};

const Person: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [person, setPerson] = useState<Person>();

  async function getPerson() {
    try {
      const resp = await axios.get<Person>(
        `https://billions-api.nomadcoders.workers.dev/person/${id}`
      );
      if (resp.status !== 200) {
        console.log(`fail to get person. status:${resp.status}`);
        return;
      }
      setPerson(resp.data);
    } catch (err) {
      console.log(`fail to request get person. err:${err}`);
    }
  }

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <>
      {!person && <div>No Data</div>}
      {person && (
        <div>
          <div className={styles.info}>
            <img
              src={person.squareImage}
              width="200"
              height="200"
              alt="no pictures"
            />
            <span>{person.name}</span>
            <span>Networth: {person.netWorth}</span>
            <span>County: {person.country}</span>
            <span>Industry: {person.industries[0]}</span>
            <span>{person.bio.join("")}</span>
          </div>
          <div>
            <h1>Financial Assets</h1>
            <div className={styles.assets}>
              {person.financialAssets.map((v, i) => (
                <div key={i} className={styles.asset}>
                  <span>Ticker: {v.ticker}</span>
                  <span>Shares: {v.sharePrice}</span>
                  <span>Current Price: ${v.currentPrice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Person;
