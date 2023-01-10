;Write a function that produces the linear list of all atoms of a given list, fromall levels, and written in the same order.
;Eg.: (((A B) C) (D E)) --> (A B C D E)

(defun linearize(l)
    (cond 
        ((null l) l)
        ((atom l) (list l))
        (t (mapcan #' linearize l))
    )
)


(print (linearize '(((1 2) 3) (4 E))))