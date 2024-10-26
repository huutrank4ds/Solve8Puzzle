
def expand_case(current):
    """
        current: Trạng thái hiện tại của 8-puzzle là string gôm 9 kí tự
            "123456780" tương ứng 8-puzzle có dạng
            1 2 3
            4 5 6
            7 8   
            Số 0 là vị trí ô trống
        Trả về: list các trạng thái tiếp theo từ trạng thái ban đầu có dạng
        [str1, str2, str3, ...]  
    """ 
    zero_index = current.find('0')
    if zero_index == -1:
        raise ValueError('Khong co vi tri trong')
    if zero_index == 0 or zero_index == 6:
        return [swap_char(current, zero_index, zero_index + 1), swap_char(current, zero_index, 3)]
    if zero_index == 2 or zero_index == 8:
        return [swap_char(current, zero_index, zero_index - 1), swap_char(current, zero_index, 5)]
    if zero_index == 4:
        return [swap_char(current, 4, i) for i in [1, 3, 5, 7]]
    if zero_index == 3 or zero_index == 5:
        return [swap_char(current, zero_index, i) for i in [zero_index - 3, zero_index + 3, 4]]
    if zero_index == 1 or zero_index == 7:
        return [swap_char(current, zero_index, i) for i in [zero_index - 1, zero_index + 1, 4]]

def swap_char(s, i, j):
    lst = list(s)
    lst[i], lst[j] = lst[j], lst[i]
    return ''.join(lst)

def heuricstic_manhattan_distance(current_state, goal_state):
    result = 0
    for i in "12345678":
        pos_in_current = (int(current_state.index(i)/3), current_state.index(i)%3)
        pos_in_goal = (int(goal_state.index(i)/3), goal_state.index(i)%3)
        result += manhattan_distance(pos_in_current, pos_in_goal)
    return result

def manhattan_distance(x, y):
    return abs(x[0] - y[0]) + abs(x[1] - y[1])

def count_inversions(current):
    temp = [int(i) for i in current if i != '0']
    result = 0
    for i in range(len(temp)):
        for j in range(i + 1, len(temp)):
            if temp[i] > temp[j]:
                result += 1
    return result

def except_case(first_state, goal_state):
    return count_inversions(first_state) + count_inversions(goal_state) % 2 == 0
