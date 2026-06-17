# Notification System Design: Priority Inbox

## Approach to Maintaining Top `N` Notifications Efficiently

To prioritize notifications based on a combination of **weight** (Placement > Result > Event) and **recency**, we can define the priority of a notification as a tuple: `(Weight, Timestamp)`.

- **Weight**: Placement = 3, Result = 2, Event = 1, Others = 0.
- **Timestamp**: Unix timestamp of when the notification was generated.

When comparing two notifications `A` and `B`:
1. If `A.Weight != B.Weight`, the one with the higher weight has higher priority.
2. If `A.Weight == B.Weight`, the one with the higher timestamp (more recent) has higher priority.

### Efficiently Maintaining the Top `N` (e.g., Top 10)
Since new notifications continuously stream in and the total volume is high, sorting all notifications repeatedly `O(M log M)` is extremely inefficient. 

Instead, the most optimal data structure is a **Min-Heap (Priority Queue) of fixed size `N`**.

#### How it works:
1. **Min-Heap Property**: The heap stores the *Top N* most important notifications seen so far. The "root" of this Min-Heap is always the **least important** notification among these Top N.
2. **Processing a New Notification**:
   - If the heap has fewer than `N` elements, simply insert the new notification. `O(log N)`
   - If the heap has exactly `N` elements, we compare the incoming notification with the root (the minimum of the Top N).
   - If the new notification has a **higher priority** than the root, we remove the root and insert the new notification. `O(log N)`
   - If the new notification has a lower priority, we ignore it. `O(1)`

#### Complexity:
- **Time Complexity**: `O(log N)` per incoming notification. Since `N` is small (e.g., 10, 15, 20), this is effectively `O(1)` constant time.
- **Space Complexity**: `O(N)` to store the heap in memory, which is highly efficient.

This approach guarantees that at any moment, without any expensive DB queries or full-array sorts, we have immediate access to the top `N` most critical notifications for the user's priority inbox.
