def aStarSearch(first_state, goal_state, expand_method=None, except_case=None):
    if (except_case != None & except_case(first_state, goal_state) is False):
        return False
    if (first_state == goal_state):
        return [first_state]
    