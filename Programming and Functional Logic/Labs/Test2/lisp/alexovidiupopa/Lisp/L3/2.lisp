;sum of numeric atoms at any lvl
;using MAP functions
(defun sum (l)
    (cond 
        ((numberp l) l)
        ((listp l) (apply #'+(mapcar #'sum l)))
        (t 0)
    )
)

(print (sum '(1 2 3 A 4 C (1 2 (-1 (0))))))