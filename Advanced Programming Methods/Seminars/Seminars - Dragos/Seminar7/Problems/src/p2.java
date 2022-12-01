// Problem 2: Given the following collection  List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class p2 {
	public static void main(String[] args) {
		// a) eliminates all the numbers which are not multiple of 4;
		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
		List<Integer> res = numbers.stream().filter(x -> x % 4 == 0).collect(Collectors.toList());
		System.out.println(res);

		// b) transform each remaining number into its successor (e.g. 4 is transformed into 5);
		List<Integer> res2 = res.stream().map(x -> x + 1).collect(Collectors.toList());
		System.out.println(res2);

		// c) compute the sum modulo 2 of the remaining numbers (e.g. (9 +5) mod 2=0)
		int res3 = res2.stream().mapToInt(x -> x).sum() % 2;
		System.out.println(res3);
	}
}