
(defun countNodes (tree lvl k)
    (cond 
        ((null tree) 0)
        ((= lvl k) 1)
        ((listp tree) (apply #'+ (mapcar #' (lambda (a) (countNodes a (+ 1 lvl) k)) tree)))
        (t 0)
    )
)

(print (countNodes '(1 (2 (3)) (4) (5 (6))) 0 1))