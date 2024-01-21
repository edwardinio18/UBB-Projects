; Write a function which determines the number n + 1, where n is a given number represented as a list, without converting the list to a number in base 10

(defun succ (l)
    (let ((n (length l)))
        (if (= (nth (1- n) l) 9)
            (cons (succ (subseq l 0 (1- n))) (list 0))
            (cons (subseq l 0 (1- n)) (list (1+ (nth (1- n) l))))))
)

(defun flatten (l)
    (cond
        (
            (null l) nil
        )
        (
            (atom l) (list l)
        )
        (
            (listp l) (mapcan #'flatten l)
        )
    )
)

(defun mainFlatten (l)
    (flatten l)
)

(defun main (l)
    (flatten (succ l))
)

(defun test ()
        (and
            (equal (main '(1 9 3 5 9 9)) '(1 9 3 6 0 0))
            (equal (main '(1 2 3)) '(1 2 4))
            (equal (main '(2 1 9)) '(2 2 0))
        )
)