(defun explore_path (l level node)
(cond
  ((null (car l)) nil)
  ((equal (car l) node) (list (car l)))
  (T 
    (setq left (explore_path (cadr l) (+ level 1) node ))
	  (cond 
		    ((null left) (setq right (explore_path (caddr l) (+ level 1) node ))
                     (cond
                         ((null right) NIL)
                         (T (append (list (car l)) right))
                      )
        )
		    (T (append (list (car l)) left ))
    )
 )
)
)
(print (explore_path '(A (B) (C (D) (E))) 0 'E ))
(print (explore_path '(A(B(D)(E(F(G)(H))))(C(I(J(K))))) 0 'A))
(print (explore_path '(A(B(D)(E(F(G)(H))))(C(I(J(K))))) 0 'K))