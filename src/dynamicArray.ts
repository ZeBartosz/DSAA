class dynamicArray {
	size: number;
	capacity: number;
	array: Array<any>;

	constructor(capacity: number) {
		this.size = 0;
		this.capacity = capacity;
		this.array = new Array(this.capacity);
	}

	getSize() {
		return this.size;
	}

	getCapacity() {
		return this.capacity;
	}

	getArray() {
		const temp = [];

		for (let i = 0; i < this.size; i++) {
			temp[i] = this.array[i];
		}
		return temp;
	}

	isEmpty() {
		return this.size === 0 ? true : false;
	}

	atIndex(index: number) {
		if (index > this.size || index < 0) {
			return "out of bounds";
		}

		return this.array[index];
	}

	push(value: number) {
		if (this.capacity === this.size) {
			this.grow();
		}

		this.array[this.size] = value;
		this.size++;
	}

	pop() {
		const pop = this.atIndex(this.size - 1);
		this.array[this.size - 1] = null;
		this.size--;

		if (this.size < this.capacity * 0.2) {
			this.strink();
		}

		return pop;
	}

	grow() {
		this.capacity === 0
			? (this.capacity = 5)
			: (this.capacity = Math.floor(this.capacity * 2));

		const temp = new Array(this.capacity);

		if (this.capacity === 0) {
			return (this.array = temp);
		}

		for (let i = 0; i < this.size; i++) {
			temp[i] = this.array[i];
		}

		this.array = null;
		this.array = temp;
	}

	strink() {
		const temp = new Array(Math.floor(this.capacity / 2));

		for (let i = 0; i < this.size; i++) {
			temp[i] = this.array[i];
		}

		this.capacity = Math.floor(this.capacity / 2);
		this.array = null;
		this.array = temp;
	}

	set(index: number, value: number) {
		if (index < 0 || index > this.size) {
			return "out-of-bounds";
		}

		return (this.array[index] = value);
	}

	insertAt(index: number, value: number) {
		if (index < 0 || index > this.size) {
			return;
		}

		if (this.capacity === this.size) {
			this.grow();
		}

		for (let i = this.size; i > index; i--) {
			this.array[i] = this.array[i - 1];
		}

		this.array[index] = value;

		this.size++;
	}

	removeAt(index: number) {
		if (index < 0 || index > this.size) {
			return "out-of-bounds";
		}

		const temp = new Array(this.capacity);
		const value = this.array[index];

		for (let i = 0; i < this.size - 1; i++) {
			if (i === index) i++;
			if (i < index) temp[i] = this.array[i];
			if (i > index) temp[i - 1] = this.array[i];
		}

		this.size--;
		this.array = temp;

		if (this.size <= this.capacity * 0.2) {
			this.strink();
		}

		return value;
	}

	indexOf(value: number) {
		for (let i = 0; i < this.size; i++) {
			if (this.array[i] == value) {
				return i;
			}
		}

		return "value-doesnt-exist";
	}

	contains(value: number) {
		for (let i = 0; i < this.size - 1; i++) {
			if (this.array[i] === value) {
				return true;
			}
		}
		return false;
	}
}

function main() {
	console.log("--- Initializing DynamicArray ---");
	const myArray = new dynamicArray(5);
	console.log(
		`Initial: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	console.log(`Is Empty: ${myArray.isEmpty()}`);
	console.log("\n--- Testing Push and Grow ---");

	// Test push to fill and trigger growth
	myArray.push(10); // size = 1, capacity = 5
	myArray.push(20); // size = 2, capacity = 5
	myArray.push(30); // size = 3, capacity = 5
	myArray.push(40); // size = 4, capacity = 5
	myArray.push(50); // size = 5, capacity = 5 - Should be at capacity
	console.log(
		`After 5 pushes: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	myArray.push(60); // size = 6, capacity = 10 (should grow from 5 to 10)
	console.log(
		`After 6th push (should trigger growth): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	console.log(`Is Empty: ${myArray.isEmpty()}`); // Should be false

	console.log("\n--- Testing atIndex (get) and Set ---");
	console.log(`Element at index 0: ${myArray.atIndex(0)}`); // Should be 10
	console.log(`Element at index 5: ${myArray.atIndex(5)}`); // Should be 60

	// Test out-of-bounds access for atIndex (it should handle this gracefully, e.g., return null/undefined or throw an error)
	console.log(`Element at index 10 (out of bounds): ${myArray.atIndex(10)}`);
	console.log(`Element at index -1 (out of bounds): ${myArray.atIndex(-1)}`);

	// --- Implement and then uncomment this section ---
	console.log("\n--- Testing Set ---");
	myArray.set(2, 35); // Change 30 to 35
	console.log(
		`After set(2, 35): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	console.log(`Element at index 2: ${myArray.atIndex(2)}`); // Should be 35
	// Test out-of-bounds set (should handle gracefully)
	myArray.set(100, 999);
	console.log(
		`After out-of-bounds set: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	console.log("\n--- Testing Pop and Shrink ---");
	console.log(
		`Before pop: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	); // 6 elements, capacity 10
	let poppedValue = myArray.pop(); // size = 5, capacity = 10
	console.log(
		`Popped ${poppedValue}. After 1st pop: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	poppedValue = myArray.pop(); // size = 4, capacity = 10
	poppedValue = myArray.pop(); // size = 3, capacity = 10
	poppedValue = myArray.pop(); // size = 2, capacity = 10 - Should now be at 20% of capacity 10 (2 elements)
	console.log(
		`Popped ${poppedValue}. Before 5th pop (should trigger shrink): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	poppedValue = myArray.pop(); // size = 1, capacity = 5 (should shrink from 10 to 5)
	console.log(
		`Popped ${poppedValue}. After 5th pop (should shrink): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	poppedValue = myArray.pop(); // size = 0, capacity = 5
	console.log(
		`Popped ${poppedValue}. After 6th pop: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	console.log(`Is Empty: ${myArray.isEmpty()}`); // Should be true

	// Test pop on an empty array (should handle gracefully, e.g., throw error or return null)
	console.log(`Popping from empty array: ${myArray.pop()}`);

	console.log("\n--- Testing InsertAt ---");
	myArray.push(100);
	console.log(
		`Current state: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	myArray.push(110);
	console.log(
		`Current state: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	myArray.push(120); // Current: [100, 110, 120] size=3, cap=5
	console.log(
		`Current state: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	// --- Implement and then uncomment this section ---
	myArray.insertAt(1, 105); // Insert 105 at index 1: [100, 105, 110, 120]
	console.log(
		`After insertAt(1, 105): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	myArray.insertAt(0, 99); // Insert 99 at index 0: [99, 100, 105, 110, 120]
	console.log(
		`After insertAt(0, 99): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	// Test insertion into a full array (should grow then insert)
	myArray.insertAt(myArray.getSize(), 125); // effectively a push
	console.log(
		`After insertAt(end, 125): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	myArray.insertAt(3, 115); // Insert in middle, should cause growth: [99, 100, 105, 115, 110, 120, 125]
	console.log(
		`After insertAt(3, 115) (should trigger growth): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	// Test out-of-bounds insert (e.g., negative index or index > size)
	myArray.insertAt(100, 999);

	console.log("\n--- Testing RemoveAt ---");
	myArray.push(130);
	myArray.push(140);
	myArray.push(150); // Current: [100, 110, 120, 130, 140, 150] (if you haven't implemented insert yet)
	console.log(
		`Current state: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);

	// --- Implement and then uncomment this section ---
	let removedValue = myArray.removeAt(1); // Remove 110 (or 105 if you did inserts)
	console.log(
		`Removed ${removedValue}. After removeAt(1): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	removedValue = myArray.removeAt(0); // Remove first element
	console.log(
		`Removed ${removedValue}. After removeAt(0): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	// Test removal that triggers shrink
	myArray.push(200);
	myArray.push(210);
	myArray.push(220); // Add some elements to get capacity up
	console.log(
		`State before remove/shrink test: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	while (myArray.getSize() > 3) {
		// Remove until shrink condition is met
		myArray.removeAt(myArray.getSize() - 1); // Remove from end, for simplicity
	}
	console.log(
		`After multiple removeAt (should trigger shrink): Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	// Test out-of-bounds remove

	console.log("\n--- Testing Search (indexOf, contains) ---");
	// --- Implement and then uncomment this section ---
	console.log(
		`Current state: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`
	);
	console.log(`Index of 120: ${myArray.indexOf(120)}`); // Should be its current index
	console.log(`Index of 500 (not found): ${myArray.indexOf(500)}`); // Should be -1
	console.log(`Contains 100: ${myArray.contains(100)}`);
	console.log(`Contains 999: ${myArray.contains(999)}`);

	console.log("\n--- Testing Clear ---");
	// --- Implement and then uncomment this section ---
	// console.log(`Before clear: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`);
	// myArray.clear();
	// console.log(`After clear: Size = ${myArray.getSize()}, Capacity = ${myArray.getCapacity()}, Array = ${myArray.getArray()}`);
	// console.log(`Is Empty after clear: ${myArray.isEmpty()}`);
}

main();
