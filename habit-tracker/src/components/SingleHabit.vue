<template>
    <div class="habit" :class="{ complete: habit.complete }">
        <div class="actions">
            <h3 @click="showDescription = !showDescription">{{ habit.title }}</h3>
            <div class="icons">
                <span @click="deleteHabit" class="material-icons">delete</span>
                <router-link :to="{ name: 'EditHabit', params: { id: habit.id } }">
                    <span class="material-icons">edit</span>
                </router-link>
                <span @click="toggleComplete" class="material-icons tick">done</span>
            </div>
        </div>
        <div v-if="showDescription" class="description">
            <p>{{ habit.details }}</p>
        </div>
    </div>
</template>

<script>
export default{
    
}
</script>

<style>
.habit {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
}

h3 {
    cursor: pointer;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.material-icons:hover {
    color: #777;
}


.habit.complete {
    border-left: 4px solid #00ce89;
}

.habit.complete .tick {
    color: #00ce89;
}
</style>