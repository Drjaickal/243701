# Stage 1: Notification System API Design

## Core Actions:
- Create Notification
- Get Notifications
- Mark as Read
- Delete Notification

## Endpoints:

### GET /notifications
Query:
- page
- limit
- notification_type

Response:
{
  "notifications": [
    {
      "id": "string",
      "type": "Event | Result | Placement",
      "message": "string",
      "timestamp": "datetime",
      "isRead": false
    }
  ]
}

### POST /notifications
{
  "type": "Event",
  "message": "string"
}

### PUT /notifications/:id/read

### DELETE /notifications/:id

## Real-time:
WebSockets (preferred), Polling fallback


# Stage 2: Database Design

## DB:
PostgreSQL

## Table: notifications
- id (UUID)
- student_id (INT)
- type (ENUM)
- message (TEXT)
- is_read (BOOLEAN)
- created_at (TIMESTAMP)

## Problems:
- Large data
- Slow queries

## Solutions:
- Indexing
- Pagination
- Archiving

## Query:
SELECT * FROM notifications
WHERE student_id = 101 AND is_read = false
ORDER BY created_at DESC LIMIT 10;


# Stage 3: Optimization

## Problem:
Slow query (no index)

## Fix:
CREATE INDEX idx_notifications
ON notifications(student_id, is_read, created_at);

## Why not all indexes?
- Slow writes

## Query:
SELECT id, type, message, created_at
FROM notifications
WHERE student_id = 1842 AND is_read = false
ORDER BY created_at DESC;

## Placement Query:
SELECT DISTINCT student_id
FROM notifications
WHERE type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';


# Stage 4: Performance

## Solutions:
- Redis caching
- Pagination
- Lazy loading
- WebSockets

## Tradeoff:
Cache fast but complex


# Stage 5: Scalable System

## Problem:
Email failure breaks flow

## Solution:
Queue (Kafka/RabbitMQ)

## Flow:
Save → Queue → Worker → Email

## Pseudocode:
function notify_all(ids, msg):
  for id in ids:
    save_to_db(id, msg)
    push_to_queue(id, msg)


# Stage 6: Priority Logic

Priority:
Placement > Result > Event

Sort by:
1. Priority
2. Timestamp

Return top 10 notifications