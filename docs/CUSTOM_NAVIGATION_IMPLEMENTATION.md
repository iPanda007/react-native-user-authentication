# Custom Navigation Implementation - Final Solution

## Your Exact Requirements Met

✅ **Navigation Order**: `[home, shop, about, profile]` (original order)  
✅ **Right Side (Swipe Left)**: home → shop → about → profile  
✅ **Left Side (Swipe Right)**: profile → home (direct, special case)

---

## Index Calculations

### Order: [home, shop, about, profile]
- **Index 0**: home
- **Index 1**: shop
- **Index 2**: about  
- **Index 3**: profile

---

## Swipe Left (Standard Navigation)

| From Route | From Index | To Index | To Route | Calculation |
|------------|------------|----------|----------|-------------|
| home | 0 | 1 | shop | (0 + 1) % 4 = 1 |
| shop | 1 | 2 | about | (1 + 1) % 4 = 2 |
| about | 2 | 3 | profile | (2 + 1) % 4 = 3 |
| profile | 3 | 0 | home | (3 + 1) % 4 = 0 |

**Flow**: `home → shop → about → profile → home` ✅

---

## Swipe Right (Custom Navigation)

### Standard Calculation:
| From Route | From Index | To Index | To Route | Calculation |
|------------|------------|----------|----------|-------------|
| home | 0 | 3 | profile | wraparound: 4 - 1 = 3 |
| shop | 1 | 0 | home | 1 - 1 = 0 |
| about | 2 | 1 | shop | 2 - 1 = 1 |
| profile | 3 | 2 | about | 3 - 1 = 2 |

### **SPECIAL CASE**: From Profile → Home
Instead of `profile → about`, we override to `profile → home`:

```typescript
if (freshRoute === 'profile') {
  // SPECIAL CASE: From profile, go directly to home
  router.push('/home');
  return;
}
```

**Final Swipe Right Flow**: `home ← profile (special) ← about ← shop ← home` ✅

---

## Implementation Details

### File: `hooks/useTabNavigationManager.ts`

**Navigation Order**:
```typescript
const tabOrder = useMemo(() => ['home', 'shop', 'about', 'profile'] as const, []);
```

**Custom Previous Navigation**:
```typescript
const navigateToPreviousTab = useCallback(() => {
  const freshRoute = segments[1] || 'profile';
  
  // SPECIAL CASE: From profile, go directly to home when swiping right
  if (freshRoute === 'profile') {
    debouncedNavigation(() => {
      console.log(`Navigating previous: profile -> home (special case)`);
      router.push('/home');
    });
    return;
  }
  
  // Normal navigation for other routes...
}, [router, tabOrder, debouncedNavigation, segments]);
```

---

## Final Result

### Your Desired Navigation:
- **App starts**: home screen
- **Swipe left**: home → shop → about → profile → home (standard circular)
- **Swipe right**: 
  - from **home** → profile
  - from **shop** → home  
  - from **about** → shop
  - from **profile** → **home** (special case - direct as requested) ✅

This achieves exactly what you wanted: **profile goes directly to home when swiping right**!