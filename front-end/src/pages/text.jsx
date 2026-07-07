import { useState } from "react";
import toast from "react-hot-toast";
import { FaTwitter } from "react-icons/fa6";

export default function TestPage() {
  const [score, setScore] = useState(50);
  const [mood, setMood] = useState("😐");
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="w-full h-screen bg-green-400 flex justify-center items-center">
      <div className="w-[450px] h-[450px] bg-white flex justify-center items-center flex-col rounded-lg shadow-lg">
        <h1 className="font-bold text-7xl">{score}</h1>

        <div className="w-full h-[100px] flex justify-center items-center">
          <button
            className="w-[100px] bg-red-600 text-white h-[40px] mx-5 rounded"
            onClick={() => {
              setScore(score - 1);
            }}
          >
            Decrease
          </button>

          <button
            className="w-[100px] bg-green-600 text-white h-[40px] mx-5 rounded"
            onClick={() => {
              setScore(score + 1);
            }}
          >
            Increase
          </button>
        </div>

        <h1 className="font-bold text-7xl">{mood}</h1>

        <div className="w-full h-[100px] flex justify-center items-center">
          <button
            className="w-[100px] bg-red-600 text-white h-[40px] mx-5 rounded"
            onClick={() => {
              setMood("☹️");
              toast.error("Oh no! You are sad");
            }}
          >
            Sad
          </button>

          <button
            className="w-[100px] bg-green-600 text-white h-[40px] mx-5 rounded"
            onClick={() => {
              setMood("😐");
              toast("You are neutral", {
                icon: "😐",
              });
            }}
          >
            Neutral
          </button>

          <button
            className="w-[100px] bg-blue-600 text-white h-[40px] mx-5 rounded"
            onClick={() => {
              setMood("😀");
              toast.success("Yay! You are happy");
            }}
          >
            Happy
          </button>
        </div>

        <FaTwitter
          onClick={() => {
            toast("Follow us on Twitter", {
              icon: <FaTwitter className="text-blue-500" />,
            });
            setIsFollowed(!isFollowed);
          }}
          className={
            isFollowed
              ? "text-[100px] text-blue-600 cursor-pointer"
              : "text-[100px] text-gray-600 cursor-pointer"
          }
        />
      </div>
    </div>
  );
}