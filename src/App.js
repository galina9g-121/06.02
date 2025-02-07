import React, { useState, useEffect } from 'react';

function ReactionGame() {
  const [buttonColor, setButtonColor] = useState('red');  // Изначальный цвет кнопки (красный)
  const [isGameActive, setIsGameActive] = useState(false);  // Флаг активности игры
  const [reactionTime, setReactionTime] = useState(null);  // Время реакции в миллисекундах
  const [averageTime, setAverageTime] = useState(null);  // Среднее время реакции
  const [attempts, setAttempts] = useState(0);  // Количество попыток
  const [totalTime, setTotalTime] = useState(0);  // Общее время всех попыток

  useEffect(() => {
    if (isGameActive) {
      const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;  // Случайная задержка от 2 до 5 секунд

      // Через случайное время меняем цвет кнопки на зелёный
      const timer = setTimeout(() => {
        setButtonColor('green');
        setIsGameActive(false);  // Игра заканчивается, когда кнопка становится зелёной
      }, randomDelay);

      return () => clearTimeout(timer);  // Очищаем таймер, если компонент демонтируется или игра завершается
    }
  }, [isGameActive]);

  const startGame = () => {
    setButtonColor('red');
    setReactionTime(null);
    setIsGameActive(true);
  };

  const handleClick = () => {
    if (buttonColor === 'green') {
      const reaction = Date.now() - gameStartTime;  // Время реакции
      setReactionTime(reaction);

      // Обновляем статистику
      setAttempts((prevAttempts) => {
        const newAttempts = prevAttempts + 1;
        setTotalTime((prevTotalTime) => {
          const newTotalTime = prevTotalTime + reaction;
          setAverageTime(newTotalTime / newAttempts);  // Среднее время
          return newTotalTime;
        });
        return newAttempts;
      });
    } else {
      alert('Слишком рано! Ждите, пока кнопка не станет зеленой.');
    }
  };

  const gameStartTime = Date.now();  // Время начала игры

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Игра на реакцию</h1>
      <p style={styles.description}>Нажмите кнопку, когда она станет зеленой!</p>

      <button
        onClick={handleClick}
        style={{
          ...styles.button,
          backgroundColor: buttonColor,
        }}
      >
        {buttonColor === 'red' ? 'Ждите...' : 'Нажмите!'}
      </button>

      {reactionTime !== null && (
        <div style={styles.resultContainer}>
          <p style={styles.result}>Ваше время реакции: {reactionTime} мс</p>
        </div>
      )}

      {averageTime !== null && attempts > 0 && (
        <div style={styles.resultContainer}>
          <p style={styles.result}>Среднее время реакции: {averageTime.toFixed(2)} мс</p>
        </div>
      )}

      <br />
      {!isGameActive && (
        <div>
          <button onClick={startGame} style={styles.startButton}>
            Начать новую игру
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    margin: 'auto',
  },
  title: {
    fontSize: '36px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '20px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    width: '200px',
    transition: 'background-color 0.3s ease',
  },
  resultContainer: {
    marginTop: '20px',
  },
  result: {
    fontSize: '20px',
    color: '#333',
  },
  startButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
};

export default ReactionGame;
