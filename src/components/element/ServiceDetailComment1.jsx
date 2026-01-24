"use client";
import { useState, useEffect } from "react";

export default function ServiceDetailComment1({ userId, onSubmitted }) {
  const [me, setMe] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const canReview = me && userId && me.id !== userId;

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.data && setMe(d.data))
      .catch(() => {});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canReview || !comment.trim()) return;
    setSubmitting(true);
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, rating: Number(rating), comment }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) {
          setComment("");
          setRating(5);
          onSubmitted && onSubmitted();
        }
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  }

  return (
    <div className='bsp_reveiw_wrt mb20' dir='rtl'>
      <h6 className='fz17'>הוסף ביקורת</h6>
      {!me && <p className='text'>יש להתחבר כדי לכתוב ביקורת</p>}
      {me && !canReview && <p className='text'>לא ניתן לכתוב ביקורת על עצמך</p>}
      {canReview && (
        <form onSubmit={handleSubmit} className='comments_form mt30 mb30-md'>
          <div className='mb15'>
            <label className='fw500 d-block mb5'>דירוג</label>
            <select className='form-select' value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className='mb15'>
            <label className='fw500 d-block mb5'>תגובה</label>
            <textarea
              className='form-control'
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='כתוב כאן את דעתך'
              required
            />
          </div>
          <button type='submit' className='ud-btn btn-thm bdrs4' disabled={submitting}>
            {submitting ? "שולח..." : "שלח"}
            <i className='fal fa-arrow-right-long ms-2'></i>
          </button>
        </form>
      )}
    </div>
  );
}
