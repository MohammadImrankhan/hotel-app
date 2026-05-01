import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

export default function Feedback() {
  const API = import.meta.env.VITE_API_URL;
  console.log(API);
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    //if (user)
    fetchFeedbacks();
  }, [user]);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${API}api/Feedback/get-feedback`);
      // const res = await fetch(
      //   "https://localhost:7037/api/Feedback/get-feedback",
      // );
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!user ? (
        <FeedbackForm feedbacks={feedbacks} refresh={fetchFeedbacks} />
      ) : (
        <FeedbackList feedbacks={feedbacks} refresh={fetchFeedbacks} />
      )}
    </>
  );
}
