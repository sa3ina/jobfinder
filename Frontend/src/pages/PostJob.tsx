import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../backend/config";

type Props = {};
interface Fire {
  id: string;
  name: string;
  surname: string;
  position: string;
}

const Users = (props: Props) => {
  const [fireStroreData, setFireStroreData] = useState<Fire[]>([]);
  const getDataFirestore = async () => {
    const db = getFirestore(app);

    const querySnapshot = await getDocs(collection(db, "users"));
    console.log("querySnapshot", querySnapshot);

    let arr: Fire[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      let obj: Fire = {
        id: doc.id,
        name: doc.data().name,
        surname: doc.data().surname,
        position: doc.data().position,
      };
      arr.push(obj);
    });
    console.log("arr", arr);
    setFireStroreData(arr);
  };

  useEffect(() => {
    getDataFirestore();
  }, []);

  return (
    <div>
      Users
      <ul>
        {fireStroreData &&
          fireStroreData.map((elem, i) => {
            return (
              <li key={i}>
                {" "}
                {elem.name} :{elem.position}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Users;
