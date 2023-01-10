;a) insert E on the nth pos of a linear list
(defun change (l e i n)
    (cond 
        ((null l) nil)
        ((= i n) (cons e (change l e (+ i 1) n)))
        (t (cons (car l) (change (cdr l) e (+ i 1) n)))
    )
)

(defun solve (l e n)
    (change l e 1 n)
)

;(print (solve '(1 2 3 4 5) 100 2))

;b) sum of all numerical atoms
(defun sum (l)
    (cond 
        ((numberp l) l)
        ((listp l) (apply #'+(mapcar #'sum l)))
        (t 0)
    )
)

;(print (sum '(1 2 3 A B (4 (5)))))

;c)return all sublists of a given list
(defun sublists (l v)
(cond 
    ((null l) v)
    ((listp (car l)) (sublists (cdr l) (append (sublists (car l) v) (list (car l)))))
    (t (sublists (cdr l) v))
)
)

;(print (sublists '((1 2 3) ((4 5) 6)) ()))

;d)test eq of 2 sets
(defun contains (l x)
    (cond 
        ((null l) 0)
        ((eq (car l) x) 1)
        (t (contains (cdr l) x))
    )
)

(defun testeq (a b)
(cond 
    ((null a) 1)
    ((= (contains b (car a)) 0) 0)
    (t (testeq (cdr a) b))
)    
)

(print (+ (testeq '(1 2 3) '(3 2 1)) (testeq '(3 2 1) '(1 2 3))))