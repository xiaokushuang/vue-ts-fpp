<template></template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  // components:{componentA,componentB},
})

/**
 * “@” 函数修饰符，与其说是修饰函数倒不如说是引用、调用它修饰的函数。
 * 修饰符例子

  test(f){
    console.log("before ...");
    f()；
    console.log("after ...");
  }

    @test
    func(){
        console.log("func was called");
    }

    输出
    before ...
    func was called
    after ...
*/
export default class Demo extends Vue {
  //prop 声明
  @Prop(Number) readonly propA!: number | undefined;
  @Prop({ default: "default value" }) readonly propB!: string;
  @Prop([String, Boolean]) readonly propC!: string | boolean | undefined; 
  //data 声明
  public massage_a = "hello"; // 如果已经赋值 不需要声明
  public massage_b: string | undefined; // 声明为 string 或 undefined

  //计算属性
  private get reversed_message(): string[] {
    // :string[] 表示 返回的是一个 字符串数组
    return [this.massage_a];
  }

  //method
  public change_massage(): void {
    this.massage_a = "AA";
  }

  // 生命周期 因为不应该公开所以用 private 声明
  private created(): void {}
  private mounted(): void {}
  private updated(): void {}
  private destroyed(): void {}
}
</script>

<style ></style>
