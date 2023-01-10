(defun balanced (l level)
    (cond
        ((null (car l)) level)
        (T (setq left (balanced (cadr l) (+ level 1)))
            (setq right (balanced (caddr l) (+ level 1)))
            (cond 
                ((or (null left)(null right)) NIL)
                ((< (abs (- left right)) 2) (cond ((< left right) right) (T left)))
                (T NIL)
            )
        )
    )    
)

(defun wrap (result)
    (cond 
        ((null result) NIL)
        (T T)
    )
)

(print (wrap (balanced '(A (B) (C (D) (E))) 0)))
(print (wrap (balanced '(A(B(D)(E(F(G)(H))))(C(I(J(K))))) 0)))