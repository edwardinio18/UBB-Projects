;Write a function that substitutes an elementE withall elements of alist L1 at alllevels of a given list L

(defun subst2 (l e l1)
    (cond 
        ((and (atom l) (eq l e)) l1)
        ((and (atom l) (not (eq l e))) l)
        (t (mapcar #'(lambda (a) (subst2 a e l1)) l))
    )
)

(print (subst2 '(1 2 3 4 1 (1)) 1 '(5 5)))

(defun copy (l)
    (cond
        ((null l) nil)
        (t (cons (car l) (copy (cdr l))))
    )
)

(defun substitite (l e l1)
    (cond
        ((listp l) (list (mapcan #'(lambda (lst) (substitite lst e l1)) l)))
        ((equal l e) (copy l1)) ; copy required to avoid losing l1 due to destructive behaviour of mapcan
        (T (list l))
    )
)

(print (car (substitite '(1 2 3 4 1 (1)) 1 '(5 5))))