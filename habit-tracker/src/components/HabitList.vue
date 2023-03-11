<template>
    <FilterNav :current="current" @filterChange="current = $event" />
    <div v-if="habits.length">
        <div v-for="habit in filteredHabits" :key="habit.id">
            <SingleHabit :habit="habit" @delete="handleDelete" @complete="handleComplete" />
        </div>
    </div>
</template>

<script>
import FilterNav from './FilterNav.vue';
import SingleHabit from './SingleHabit.vue';
import { computed } from 'vue';
import { ref } from 'vue';

export default {
    components: {
        FilterNav,
        SingleHabit,
    },
    setup(props) {
        
        const user = ref(props.user);
     
        const habits = user.value.habits;
     
        const current = ref('all');

        const filteredHabits = computed(() => {
            if (current.value === 'completed') {
                return habits.value.filter(habit => habit.complete);
            }
            if (current.value === 'ongoing') {
                return habits.value.filter(habit => !habit.complete);
            }
            return habits.value;
        });

        return {
            habits,
            current,
            filteredHabits
        };
    }
}
</script>

<style>

</style>