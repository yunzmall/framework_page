<template>
  <role-detail :is-edit="true" />
</template>

<script>
import RoleDetail from "../components/role_details";

export default {
  name: "AddUser",
  components: { RoleDetail }
};
</script>
