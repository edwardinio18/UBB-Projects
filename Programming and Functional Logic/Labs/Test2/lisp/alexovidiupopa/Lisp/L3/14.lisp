;Write a function that returns the number of atoms in a list, at anylevel

(defun count2(l)
    (cond 
        ((atom l) 1)
        (t (apply #'+(mapcar #' count2 l)))
    )
)

(print (count2 '(1 A B (2 C (1)))))