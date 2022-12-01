import java.util.ArrayList;

class A2 {

}

class B2 extends A2 {

}

class C2 extends B2 {

}

class Amain2 {
	A method1(ArrayList<? extends A>list) {
		if (list.isEmpty())
			return null;
		else return list.get(1);
	}

	void method2(ArrayList<? super C>list, C elem) {
		list.add(elem);
	}

	void method3(C elem) {
		ArrayList<A> listA2 = new ArrayList<A>();
		listA2.add(new A());
		ArrayList<B> listB2 = new ArrayList<B>();
		listB2.add(new B());
		ArrayList<C> listC2 = new ArrayList<C>();
		listC2.add(new C());
		this.method1(listA2);
		this.method1(listB2);
		this.method1(listC2);
		this.method2(listA2, elem);
		this.method2(listB2, elem);
		this.method2(listC2, elem);
	}
}