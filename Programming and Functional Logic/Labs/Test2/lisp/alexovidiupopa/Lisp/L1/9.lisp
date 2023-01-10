;9a)Write a function that merges two sorted linear lists and keeps double values.

(defun merges (a b)
    (cond
        ((null a) b)
        ((null b) a)
        ((> (car a) (car b)) (cons (car b) (merges a (cdr b))))
        (T (cons (car a) (merges (cdr a) b)))
    )
)

(print (merges '(1 2 3 4 5) '(0 2 4 4 9 10)))


;9b)Write a function to replace an element E by all elements of a list L1 at all levels of a givenlist L

(defun my_append (l1 l2)
    (COND 
        ((null l1) l2)
        ((null l2) l1)
        (T (cons (car l1) (my_append (cdr l1) l2)) 
        )
    )
)

(defun my_replace (l1 l2 e r)
    (cond 
        ((null l1) r)
        (
            (equal (car l1) e)
            (my_replace (cdr l1) l2 e (my_append r l2))
        )
        (
            T 
            (my_replace (cdr l1) l2 e (my_append r (list (car l1))))
        )
    )
)
(print (my_replace '(1 2 3 4 5) '(0 0) 3 ()))

;9c)Write  a  function  which  determines  the  sum  of  two  numbers  in  list  representation,  and  returns  
;the corresponding  decimal  number, without  transforming  the  representation  of  the  number  from  list  to number.
(defun my_reverse (l r)
    (cond 
        ((null l) r)
        (T 
            (my_reverse (cdr l) (cons (car l) r))
        )
    )
)

(defun my_carry (l k c)
    (cond
        ((null l) (if (> (- (+ k c) (mod (+ k c) 10)) 9) 
                      (quote 1) 
                      (quote 0)
                  )
        )
        ((null k) (if (> (- (+ l c) (mod (+ l c) 10)) 9)
                      (quote 1) 
                      (quote 0)
                  )
        )
        (T (if (> (- (+ l k c) (mod (+ l k c) 10)) 9)
                      (quote 1) 
                      (quote 0)
                  )
        )
    )
)

(defun my_digit (c1 c2 k)
    (cond
        ((null c1) (mod (+ c2 k) 10))
        ((null c2) (mod (+ c1 k) 10))
        (T (mod (+ c1 c2 k) 10))
    )
)

(defun sum_two (a b c)
    (cond 
        (
            (and (null a) (null b) (if (= 1 c) (list 1) (list 0))) 
            
        )
        (T 
            (my_append (sum_two (cdr a) (cdr b) (my_carry (car a) (car b) c))
                        (list (my_digit (car a) (car b) c))
            )
        )
    )
)

(defun sum_ (a b)
    (sum_wrapper (sum_two (my_reverse a ()) (my_reverse b ()) 0))
)

(defun sum_wrapper (a)
    (cond 
        ((= 0 (car a)) (cdr a))
        (T a)
    )
)
;9d)Write a function to return the greatest common divisor of all numbers in a linear list.
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

(print (gcdlist '(32 16 32 (8 16) 72 A) 0))