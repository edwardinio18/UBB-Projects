;Write  a  function  to  compute  the  result  of  an  arithmetic expression memorised in preorder on a stack.
;Examples:(+ 1 3) ==> 4  (1 + 3)
;(+ * 2 4 3) ==> 11  [((2 * 4) + 3)
;(+ * 2 4 -5 * 2 2) ==> 9  ((2 * 4) + (5 -(2 * 2))




;d) check if a list has an even no of elements on the first level without counting them
;idea is we can go 2 by 2 and always check if (car l)==nil, case in which we have an odd no, otherwise,if we reach end-> even

(defun check(l)
    (cond
        ((null l) t)
        ((null (cadr l) )nil)       
        (t (check (cddr l)))
    )
)

(print (check '(1 2 3 4)))
(print (check '(1 2 3 4 5)))