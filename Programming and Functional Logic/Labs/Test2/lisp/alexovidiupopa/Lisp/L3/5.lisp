;Write a function that computes the sum of even numbers and the decreasethe sum ofodd numbers, at any level of a list.

(defun solve(l)
    (cond 
        ((and (numberp l) (eq 0 (mod l 2))) l)
        ((and (numberp l) (eq 1 (mod l 2))) (* l -1))
        ((listp l) (apply #'+(mapcar #'solve l)))
        (t 0)
    )
)

(print (solve '(2 4 6 A (1 3 11 B (C)))))