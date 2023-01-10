;Write a function that removes all occurrences of an atom from any level of a list.

(defun rmv (l e)
    (cond 
        ((and (atom l) (eq l e)) nil)
        ((atom l) (list l))
        (t (mapcan (lambda (a) (rmv a e)) l))
        
    )
)

(print (rmv '(1 2 3 (1 2 (1)) 1) 1))