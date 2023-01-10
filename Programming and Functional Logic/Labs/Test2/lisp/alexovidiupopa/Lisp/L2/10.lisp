;level of a node in a tree of type 2

(defun getlevel (x l lvl)
    (cond 
        ((null (car l)) nil)
        ((eq (car l) x) lvl)
        (t 
            (or (getlevel x (cadr l) (+ 1 lvl)) (getlevel x (caddr l) (+ 1 lvl)))
        )
    )
)

(print (getlevel 1 '(1 (2) (3 (4) (5))) 0))
(print (getlevel 2 '(1 (2) (3 (4) (5))) 0))
(print (getlevel 5 '(1 (2) (3 (4) (5))) 0))
(print (getlevel 7 '(1 (2) (3 (4) (5))) 0))