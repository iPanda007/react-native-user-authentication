# Navigation Index Calculation

## Original Order: [home, shop, about, profile]

### Index Mapping:
- **Index 0**: home
- **Index 1**: shop  
- **Index 2**: about
- **Index 3**: profile

---

## Swipe Left (Next Navigation - Move Forward in Array)

**Formula**: `nextIndex = (currentIndex + 1) % arrayLength`

| Current Route | Current Index | Calculation | Next Index | Next Route |
|---------------|---------------|-------------|------------|------------|
| **home** | 0 | (0 + 1) % 4 = 1 | **1** | **shop** |
| **shop** | 1 | (1 + 1) % 4 = 2 | **2** | **about** |
| **about** | 2 | (2 + 1) % 4 = 3 | **3** | **profile** |
| **profile** | 3 | (3 + 1) % 4 = 0 | **0** | **home** |

### Swipe Left Flow:
```
home → shop → about → profile → home (circular)
```

---

## Swipe Right (Previous Navigation - Move Backward in Array)

**Formula**: `prevIndex = currentIndex === 0 ? arrayLength - 1 : currentIndex - 1`

| Current Route | Current Index | Calculation | Previous Index | Previous Route |
|---------------|---------------|-------------|----------------|----------------|
| **home** | 0 | 0 === 0 ? 4 - 1 : 0 - 1 | **3** | **profile** |
| **shop** | 1 | 1 === 0 ? 4 - 1 : 1 - 1 | **0** | **home** |
| **about** | 2 | 2 === 0 ? 4 - 1 : 2 - 1 | **1** | **shop** |
| **profile** | 3 | 3 === 0 ? 4 - 1 : 3 - 1 | **2** | **about** |

### Swipe Right Flow:
```
home → profile → about → shop → home (circular)
```

---

## Your Original Request Analysis

You wanted:
- **Right side**: home → shop → about → profile ✅ (Matches Swipe Left)
- **Left side**: profile → home (direct) ❌ (Currently: profile → about)

### The Problem:
With the order `[home, shop, about, profile]`, when you swipe right from **profile**, you get:
- **profile** (index 3) → **about** (index 2)

But you wanted:
- **profile** (index 3) → **home** (index 0)

---

## Solution: Custom Navigation Logic

To achieve **profile → home** directly when swiping right, we need custom logic:

```typescript
const navigateToPreviousTab = useCallback(() => {
  const freshRoute = segments[1] || 'profile';
  
  // Special case: from profile, go directly to home
  if (freshRoute === 'profile') {
    debouncedNavigation(() => {
      console.log(`Navigating previous: profile -> home (special case)`);
      router.push('/home');
    });
    return;
  }
  
  // Normal navigation for other routes
  const freshTabIndex = tabOrder.indexOf(freshRoute);
  const prevIndex = freshTabIndex === 0 ? tabOrder.length - 1 : freshTabIndex - 1;
  const prevTab = tabOrder[prevIndex];
  
  debouncedNavigation(() => {
    console.log(`Navigating previous: ${freshRoute} -> ${prevTab}`);
    router.push(`/${prevTab}`);
  });
}, [router, tabOrder, debouncedNavigation, segments]);
```

## Final Navigation Behavior

### Swipe Left (Standard):
```
home → shop → about → profile → home
```

### Swipe Right (Custom):
```
home → profile (special case)
shop → home
about → shop
profile → home (special case) ✅
```

This achieves your desired behavior: **profile → home** directly when swiping right!