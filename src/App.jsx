import iconDice from '/images/icon-dice.svg';
import iconDesktop from '/images/pattern-divider-desktop.svg';
import { useState, useEffect } from 'react';

export default function App() {
  const [advice, setAdvice] = useState([]);

  const fetchRandomAdvice = () => {
    const randomAdviceId = Math.floor(Math.random() * 217);
    fetch(`https://api.adviceslip.com/advice/${randomAdviceId}`)
      .then(response => response.json())
      .then(data => {
        // Check if adviceItem is not null before updating the state
        if (data.slip) {
          setAdvice([data.slip]);
        } else {
          // Handle the case where adviceItem is null (not found)
          console.warn('Random advice not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
      });
  };

  useEffect(() => {
    fetchRandomAdvice();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const changeAdvice = () => {
    fetchRandomAdvice();
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-Dark-Blue">
      <section className="w-96 flex flex-col gap-8 p-4 items-center text-center bg-Dark-Grayish-Blue rounded-md">
        {advice.map((adviceItem) => (
          <div key={adviceItem.id}>
            <h1 className='text-Neon-Green'>ADVICE #{adviceItem.id}</h1>
            <p className='text-Light-Cyan text-xl'>{adviceItem.advice}</p>
            <img src={iconDesktop} alt="" />
          </div>
        ))}

        <span onClick={changeAdvice} className='p-2 bg-Neon-Green rounded-full cursor-pointer'>
          <img src={iconDice} alt="" className='w-6' />
        </span>
      </section>
    </main>
  );
}
