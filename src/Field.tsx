import { useState } from "react";
import { useEffect } from "react";
import { Card } from "./Card";

const catProviderUrl = "https://cataas.com";

async function fetchCatUrl(): Promise<string> {
  const rawResponse = await fetch(`${catProviderUrl}/cat?json=true`);
  const jsonResponse = await rawResponse.json();
  return catProviderUrl + jsonResponse.url;
}

export function Field() {
  const reveal_arr = Array(8).fill(false);
  const [reveal, setReveal] = useState(reveal_arr);
  const cat_arr = Array(8).fill(null);
  const [cat, setCat] = useState(cat_arr);

  function CardClick(cardId: number) {
    setReveal((previousValue) =>
      previousValue.map((value, i) => (i === cardId ? !value : value))
    );
  }

  useEffect(function () {
    async function fetchCat() {
      const response = await Promise.all(
        Array(8)
          .fill(null)
          .map((value, i) => fetchCatUrl())
      );
      setCat(response);
    }
    fetchCat();
  }, []);

  const arr = Array(8)
    .fill(0)
    .map((_, i) => i + 1);
  return (
    <div className="Field">
      {arr.map((_, i) => (
        <Card
          key={i}
          text={"Card " + (i + 1)}
          isRevealed={reveal[i]}
          handleClick={() => CardClick(i)}
        >
          <img height={200} width={200} src={cat[i]} />
        </Card>
      ))}
    </div>
  );
}
