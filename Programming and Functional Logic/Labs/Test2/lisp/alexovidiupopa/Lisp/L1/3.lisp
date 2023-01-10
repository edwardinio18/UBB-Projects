;a) insert an atom after the even positions
(defun ins (l i x)
    (cond 
        ((= (mod i 2) 0) (cons x (ins l (+ i 1 ) x)))
        ((null l) nil)
        (t (cons (car l) (ins (cdr l) (+ i 1) x)))
    )
)

;(print (ins '(1 2 3 4 5 6) 1 100))


;b)
(defun getatoms (l)
    (cond 
        ((null l) nil)
        ((listp (car l)) (append (getatoms (car l)) (getatoms (cdr l))))
        (t (append (list (car l)) (cdr l)))
        
    )
)

;(print (getatoms '(1 2 3 (1 2))))

;c) gcd list 
(defun gcd_ (a b)
    (cond 
        ((and (not (numberp a)) (not (numberp b))) nil)
        ((not (numberp a)) b)
        ((not (numberp b)) a)
        ((< a b) (gcd_ b a))
        ((equal b 0) a)
        (T (gcd_ b (mod a b)))
    )
)

;(print (gcd '10 '20))
(defun gcdlist(a aux)
    (cond 
        ((null a) aux)
        (
            (listp (car a))
            (gcdlist (car a) aux)
        )
        (
            T 
            (atom a) 
            (gcdlist (cdr a) (gcd_ (car a) aux))
        )
    )

)

;(print (gcdlist '(32 16 32 (8 16) 72 A) 0))

;d) nr occurences elem in list
(defun count2 (x l c)
    (cond 
        ((null l) c)
        ((eq x (car l)) (count2 x (cdr l) (+ 1 c)))
        (t (count2 x (cdr l) c))
    )
)

;(print (count2 1 '(1 2 3 1 1 4) 0))