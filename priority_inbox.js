/**
 * Priority Inbox - Top N Notifications
 * Maintains the Top N most important notifications efficiently using a Min-Heap.
 * Priority: Weight (placement > result > event) > Recency
 */

const WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
  alert: 0
};

// Represents a single notification
class Notification {
  constructor(id, type, title, timestamp) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.timestamp = timestamp;
    this.weight = WEIGHTS[this.type] ?? 0;
  }
}

// Custom Min-Heap to maintain the Top N notifications
class PriorityNotificationHeap {
  constructor(capacity) {
    this.heap = [];
    this.capacity = capacity;
  }

  // A is less than B if it has LOWER priority (we want the lowest priority at the root of the Min-Heap)
  // so we can easily evict the least important element of the Top N.
  isLess(a, b) {
    if (a.weight !== b.weight) {
      return a.weight < b.weight;
    }
    return a.timestamp < b.timestamp;
  }

  getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
  getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
  getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.getParentIndex(index) >= 0 &&
      this.isLess(this.heap[index], this.heap[this.getParentIndex(index)])
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < this.heap.length &&
        this.isLess(this.heap[rightChildIndex], this.heap[smallerChildIndex])
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.isLess(this.heap[index], this.heap[smallerChildIndex])) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  // Stream a new notification into the priority inbox
  processNotification(notification) {
    if (this.heap.length < this.capacity) {
      // If we haven't reached capacity, just add it
      this.heap.push(notification);
      this.heapifyUp();
    } else {
      // If the incoming notification is MORE important than the LEAST important one in our Top N
      // (which sits at the root / index 0 of our Min-Heap)
      if (this.isLess(this.heap[0], notification)) {
        this.heap[0] = notification; // Replace root
        this.heapifyDown(); // Restore heap property
      }
    }
  }

  // Get the Top N notifications sorted from highest priority to lowest
  getTopNotifications() {
    // Clone and sort descending for display
    return [...this.heap].sort((a, b) => {
      if (a.weight !== b.weight) {
        return b.weight - a.weight;
      }
      return b.timestamp - a.timestamp;
    });
  }
}

// -----------------------------------------------------------------------------
// Demonstration / Test Run
// -----------------------------------------------------------------------------

console.log("=== Campus Notification System: Priority Inbox Simulator ===\n");

// We'll maintain the top 10 notifications
const priorityInbox = new PriorityNotificationHeap(10);

// Generate a large stream of random mock notifications
const mockTypes = ['placement', 'result', 'event', 'alert'];

let baseTime = Date.now() - 1000000;

const stream = [];
for (let i = 1; i <= 50; i++) {
  const type = mockTypes[Math.floor(Math.random() * mockTypes.length)];
  const title = `Notification #${i}: ${type.toUpperCase()} update`;
  const timestamp = baseTime + (i * 5000); // simulate notifications coming in over time
  stream.push(new Notification(i, type, title, timestamp));
}

// Manually insert a few highly important ones to ensure they get captured
stream.push(new Notification(998, 'placement', 'Google On-Campus Drive Registration', baseTime + 900000));
stream.push(new Notification(999, 'placement', 'Microsoft Interview Shortlist', baseTime + 950000));
stream.push(new Notification(1000, 'result', 'Semester 6 Final Results', baseTime + 800000));

console.log(`Streaming ${stream.length} incoming notifications through the Priority Inbox...`);

// Process the stream simulating O(log N) per insertion
stream.forEach(notification => priorityInbox.processNotification(notification));

console.log("\n=== TOP 10 PRIORITY INBOX ===");
const top10 = priorityInbox.getTopNotifications();

top10.forEach((notif, index) => {
  const dateStr = new Date(notif.timestamp).toLocaleTimeString();
  console.log(`${(index + 1).toString().padStart(2, ' ')}. [${notif.type.toUpperCase().padEnd(9, ' ')}] (Weight: ${notif.weight}) - ${notif.title} - ${dateStr}`);
});

console.log("\nNotice how Placements (Weight 3) are at the top, followed by Results (Weight 2).");
console.log("Among the same type, newer notifications appear higher.");
