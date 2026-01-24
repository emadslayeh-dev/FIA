"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ServiceDetailReviewInfo1({ userId, reloadTrigger = 0, onChanged }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/api/reviews?userId=${userId}`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.data)) setReviews(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId, reloadTrigger]);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.data && setMe(d.data))
      .catch(() => {});
  }, []);

  function startEdit(review) {
    setEditingId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditComment("");
    setEditRating(5);
  }

  function submitEdit(e) {
    e.preventDefault();
    if (!editingId) return;
    setUpdating(true);
    fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId: editingId, rating: Number(editRating), comment: editComment }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && d?.data) {
          setReviews((prev) => prev.map((rev) => (rev.id === editingId ? d.data : rev)));
          cancelEdit();
          onChanged && onChanged();
        }
      })
      .catch(() => {})
      .finally(() => setUpdating(false));
  }

  function deleteReview(id) {
    if (!id) return;
    if (!confirm("האם למחוק את הביקורת?")) return;
    fetch(`/api/reviews?reviewId=${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) {
          setReviews((prev) => prev.filter((rev) => rev.id !== id));
          if (editingId === id) cancelEdit();
          onChanged && onChanged();
        }
      })
      .catch(() => {});
  }

  const average = reviews.length
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(2)
    : null;
  const dist = [5, 4, 3, 2, 1].map((star) => reviews.filter((r) => r.rating === star).length);
  const maxCount = Math.max(1, ...dist);

  return (
    <div className='product_single_content mb50' dir='rtl'>
      <div className='mbp_pagination_comments'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='total_review mb30 mt45'>
              <h4>{average ? `${reviews.length} ביקורות` : "אין ביקורות"}</h4>
            </div>
            <div className='d-md-flex align-items-center mb30'>
              <div className='total-review-box d-flex align-items-center text-center mb30-sm'>
                <div className='wrapper mx-auto'>
                  <div className='t-review mb15'>{average || "--"}</div>
                  <h5>{average ? "ממוצע" : ""}</h5>
                  {average && <p className='text mb-0'>{reviews.length} ביקורות</p>}
                </div>
              </div>
              <div className='wrapper ml60 ml0-sm'>
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const count = dist[idx];
                  const pct = Math.round((count / maxCount) * 100);
                  return (
                    <div className='review-list d-flex align-items-center mb10' key={star}>
                      <div className='list-number'>{star} ⭐</div>
                      <div className='progress'>
                        <div
                          className='progress-bar'
                          style={{ width: `${pct}%` }}
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className='value text-end'>{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            {loading && <div className='mb20'>טוען...</div>}
            {!loading && !reviews.length && <div className='mb20'>אין עדיין ביקורות</div>}
            {!loading &&
              reviews.slice(0, 5).map((rev) => {
                const isAuthor = me && rev.authorUserId === me.id;
                const isEditing = editingId === rev.id;
                return (
                  <div key={rev.id} className='mbp_first position-relative mb30-sm'>
                    <div className='d-flex align-items-center'>
                      <Image
                        height={60}
                        width={60}
                        src={rev.author?.profileImageUrl || "/images/team/fl-1.png"}
                        className='mr-3 rounded-circle'
                        alt='reviewer'
                      />
                      <div className='ml20 grow'>
                        <h6 className='mt-0 mb-0'>
                          {`${rev.author?.firstName || ""} ${rev.author?.lastName || ""}`.trim() || "משתמש"}
                        </h6>
                        <div className='fz14'>
                          {new Date(rev.createdAt).toLocaleDateString("he-IL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}{" "}
                          {`• דירוג: ${rev.rating}/5`}
                        </div>
                        {!isEditing && (
                          <p className='text mt10 mb10' style={{ whiteSpace: "pre-wrap" }}>
                            {rev.comment}
                          </p>
                        )}
                        {isEditing && (
                          <form onSubmit={submitEdit} className='mt10 mb10'>
                            <div className='mb10'>
                              <label className='d-block fw500 mb5'>דירוג</label>
                              <select
                                className='form-select'
                                value={editRating}
                                onChange={(e) => setEditRating(e.target.value)}>
                                {[5, 4, 3, 2, 1].map((r) => (
                                  <option key={r} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className='mb10'>
                              <label className='d-block fw500 mb5'>תגובה</label>
                              <textarea
                                className='form-control'
                                rows={4}
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                required
                              />
                            </div>
                            <div className='d-flex gap-2'>
                              <button type='submit' className='ud-btn btn-thm bdrs4' disabled={updating}>
                                {updating ? "שומר..." : "שמור"}
                                <i className='fal fa-check ms-2' />
                              </button>
                              <button
                                type='button'
                                className='ud-btn btn-light-thm bdrs4'
                                onClick={cancelEdit}
                                disabled={updating}>
                                ביטול <i className='fal fa-times ms-2' />
                              </button>
                            </div>
                          </form>
                        )}
                        {isAuthor && !isEditing && (
                          <div className='d-flex gap-2 mt10'>
                            <button
                              type='button'
                              className='ud-btn btn-light-thm bdrs4 fz12 px10 py5'
                              onClick={() => startEdit(rev)}>
                              ערוך
                            </button>
                            <button
                              type='button'
                              className='ud-btn btn-light-thm bdrs4 fz12 px10 py5'
                              onClick={() => deleteReview(rev.id)}>
                              מחק
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
