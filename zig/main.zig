const std = @import("std");
const testing = std.testing;

const allocator = std.heap.page_allocator;

export fn add(a: i32, b: i32) i32 {
    return a + b;
}

var map: std.AutoHashMap(usize, usize) = std.AutoHashMap(usize, usize).init(allocator);

export fn get_array_len(ptr: usize) usize {
    return map.get(ptr).?;
}

export fn prime_factorize(N: u64) usize {
    var array_list: std.ArrayList(u64) = std.ArrayList(u64).init(allocator);

    var n: u64 = N;
    var p: u64 = 2;

    while (p * p <= n) {
        if (@mod(n, p) == 0) {
            while (@mod(n, p) == 0) {
                n = @divTrunc(n, p);
                array_list.append(p) catch unreachable;
            }
        }

        p += 1;
    }

    if (n != 1) {
        array_list.append(n) catch unreachable;
    }

    var slice: []u64 = array_list.toOwnedSlice();
    var ptr_int = @ptrToInt(slice.ptr);
    map.put(ptr_int, slice.len) catch unreachable;

    return ptr_int;
}

test "test" {
    var n: u64 = 10;
    var ptr = prime_factorize(n);
    var len = get_array_len(ptr);
    var slice = @intToPtr([*]u64, ptr)[0..len];

    try testing.expect(@TypeOf(len) == usize);
    try testing.expectEqual(slice[0], 2);
    try testing.expectEqual(slice[1], 5);
}
