import dynamic from "next/dynamic";
import { useState } from "react";
import { usePersistentState } from "../lib/hooks";


interface Card {
  front: string;
  back: string;
}

interface Deck {
  name: string;
  cards: Card[];
}

const RandomDrawGame = ({ deck }: { deck: Deck }) => {
  const getRandomCard = () =>
    deck.cards[Math.floor(Math.random() * deck.cards.length)];
  const [currentCard, setCurrentCard] = useState(getRandomCard());
  const [showingFront, setShowingFront] = useState(true);

  return (
    <div>
      <h2>{deck.name}</h2>
      <div>
        <div>
          <button onClick={() => setShowingFront(!showingFront)}>
            {showingFront ? "Show Back" : "Show Front"}
          </button>
          <button onClick={() => setCurrentCard(getRandomCard())}>
            Next Card
          </button>
        </div>
        <div>
          {showingFront ? currentCard.front : currentCard.back}
        </div>
      </div>
    </div>
  );
};

const decks: Deck[] = [
  {
    name: "Major Arcana Reversed Title",
    cards: [
      {
        front: "The Fool",
        back: "The Donkey",
      },
      {
        front: "The Magician",
        back: "The Trickster",
      },
      {
        front: "The High Priestess",
        back: "The Antiquarian",
      },
      {
        front: "The Empress",
        back: "The Princess",
      },
      {
        front: "The Emperor",
        back: "The Despot",
      },
      {
        front: "The Hierophant",
        back: "The Rebel",
      },
    ]
  }
];

const FlashCards = () => {
  return (
    <div>
      <h1>Flash Cards</h1>
      <div>
        <RandomDrawGame deck={decks[0]} />
      </div>
    </div>
  );
};


export default dynamic(() => Promise.resolve(FlashCards), { ssr: false });
